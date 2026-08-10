---
title: "Understanding the idea behind Durable Objects"
description: "Durable Objects turn distributed shared state into one little computer that owns a piece of state, eliminating whole classes of coordination problems."
date: 2026-08-10
category: Dev
subcategory: Ops
draft: false
---

Deno released [`celld`](https://github.com/denoland/celld) recently as an open-source implementation of Cloudflare Workers and Durable Objects. This project sparked my interest in understanding the underlying primitive behind Durable Objects.

After reading about celld and Cloudflare's Durable Objects, I want to unpack the simple yet powerful idea behind the latter:

> **We can eliminate an enormous amount of accidental distributed-systems complexity by turning distributed shared state into one little computer that owns a piece of state.**

## The problem starts with stateless servers

Modern cloud architecture teaches us to make application servers stateless:

```text
                 request
                    ↓
             Load Balancer
              /    |    \
           API-1 API-2 API-3
              \    |    /
                Database
```

This is a great model for scaling compute.

Any request can go to any server. If API-2 dies, send traffic to API-3.

The problem is that **our applications aren't actually stateless.**

Imagine a multiplayer game room.

Someone needs to know:

```text
Who is in the room?
What is the current game state?
Whose turn is it?
Which WebSockets belong to this room?
```

Now suppose Alice's request reaches API-1 while Bob's reaches API-2.

Both servers can modify the same state.

Suddenly we have a coordination problem.

A trivial counter demonstrates it:

```text
counter = 10

API-1 reads 10
API-2 reads 10

API-1 writes 11
API-2 writes 11

expected: 12
actual:   11
```

This is why real systems accumulate machinery like:

```text
database transactions
distributed locks
optimistic concurrency
Redis
pub/sub
retries
idempotency
cache invalidation
```

None of these technologies are bad.

They're solving a fundamental problem:

> **Multiple computers are allowed to act on the same logical state, so they must coordinate.**

Cloudflare's Durable Objects were designed around attacking this problem directly. A particular Durable Object runs in one place, on one thread, and owns its own persistent storage.

## What if the state simply had an owner?

Durable Objects flip the architecture.

Instead of:

```text
request
   ↓
arbitrary server
   ↓
shared database
   ↓
coordination
```

A Durable Object is basically a single place where all logic for a given "thing" runs. It is always handled by one active process at a time, so there is no chance for two servers to modify the same state concurrently:

```text
room:abc
   ↓
┌─────────────────────┐
│ Durable Object abc  │
│                     │
│ code                │
│ memory              │
│ SQLite              │
│ WebSockets          │
└─────────────────────┘
```

Every request for `room:abc` is routed to that one object, and that object becomes the only authority over its state.

Cloudflare describes a Durable Object as essentially a small server addressable by a unique name, capable of keeping state in memory and on disk. Messages sent to that name are routed to the corresponding object instance.

Now the mental model becomes wonderfully boring:

```text
class GameRoom {
    players
    board

    join(player)
    move(player, move)
    broadcast(message)
}
```

There is an authoritative owner of `players` and `board`.

That's the important part.

Not JavaScript.

Not SQLite.

Not Cloudflare's edge network.

The primitive is:

```text
identity
   ↓
single owner
   ↓
compute + state
```

## This changes the unit of scaling

Traditional cloud infrastructure tends to scale around machines, containers, functions, databases, and tables.

Durable Objects let you scale around **application entities**.

```text
user:alan      → object
chat:9832      → object
game:abc       → object
document:xyz   → object
agent:42       → object
cart:user123   → object
```

Each one behaves somewhat like a tiny computer.

This is why the abstraction maps naturally to things like collaborative documents, multiplayer games, chat rooms, queues, sessions, workflows, and agents.

And this reveals what I find most interesting about Durable Objects:

> **They don't make distributed coordination easier. They change the architecture so that much of your coordination stops being distributed.**

That is a much stronger primitive.

## Why not just use Postgres?

You absolutely can.

With normal stateless servers:

```text
API-1 ─┐
API-2 ─┼──→ Postgres
API-3 ─┘
```

Postgres becomes the synchronization point.

You can use transactions:

```text
BEGIN;

SELECT ...
FOR UPDATE;

UPDATE ...;

COMMIT;
```

For a huge class of applications, this is exactly what you should do.

But notice where your application semantics live.

Something conceptually simple like:

> “Only one player can make the next move.”

becomes a concurrency problem mediated through a shared database.

As coordination requirements increase, you may add Redis, locks, queues, caches, WebSocket infrastructure and pub/sub.

You gradually build something like:

```text
routing
+ ownership
+ locking
+ cache
+ persistence
+ messaging
+ failover
```

Durable Objects make **ownership** part of the runtime itself.

That's the difference.

## The closest idea is probably the Actor model

An actor has:

```text
identity
mailbox
private state
serialized message processing
```

Send a message to an actor, and the actor modifies its own state.

Durable Objects feel like a modern cloud version of this idea:

> **Globally addressable, durable actors with colocated persistent storage.**

The durability matters.

A traditional in-memory actor disappearing with its machine isn't sufficient for many applications. Durable Objects combine the nice programming model of actors with persistent state and automatic lifecycle management.

Objects can even disappear from memory when idle and later return without losing their durable state.

So you get something conceptually close to:

```text
millions of tiny stateful servers
```

without actually operating millions of servers.

## No free lunch

Of course, Durable Objects don't magically solve distributed systems.

They **choose a boundary around the distributed problem.**

Inside:

```text
room:abc
```

life is simple.

Across:

```text
room:abc
    ↕
room:def
```

you're distributed again.

And one hot object can become a serialization bottleneck. If millions of requests truly need to mutate one logical piece of state simultaneously, assigning it one owner doesn't make that constraint disappear.

So the trick is choosing good object boundaries.

Fortunately, many applications already contain natural ones:

```text
one user
one document
one room
one workflow
one agent
one organization
```

When those boundaries exist, Durable Objects fit unusually well.

## The primitive I would remember

The traditional cloud model says:

> **Separate compute from state, then scale compute horizontally.**

Durable Objects add another option:

> **When state naturally has an owner, move compute to that state and give it one authoritative execution context.**

That sounds like a small architectural decision.

But it removes entire classes of locks, synchronization, cache coherence, routing, and concurrency problems.

**The best infrastructure primitives aren't necessarily the ones that solve hard problems for you.**

**Sometimes they're the ones that make the hard problem disappear from your application model.**

### References

- [Deno celld](https://celld.dev/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
