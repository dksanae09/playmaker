import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    isDone: v.boolean(),
    deadline: v.optional(v.string()),
    priority: v.string(),
    playgroundId: v.id("playgrounds"),
  }),
  videos: defineTable({
    body: v.string(),
    userId: v.id("users"),
    playgroundId: v.id("playgrounds"),
    approved: v.boolean(),
    format: v.string(),
  }).index("by_playground", ["playgroundId"]),
  messages: defineTable({
    message: v.string(),
    playgroundId: v.id("playgrounds"),
    fromUser: v.id("users"),
    toUser: v.id("users"),
  }),
  playgrounds: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    deadline: v.string(),
    owner: v.id("users"),
    editor: v.id("users"),
  }),
  users: defineTable({
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
