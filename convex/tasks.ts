import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import encryptText from "./messages";

export const add = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    isDone: v.boolean(),
    deadline: v.optional(v.string()),
    priority: v.string(),
    playgroundId: v.id("playgrounds"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated!");
    }
    if (!args.playgroundId) {
      throw new Error("No playgroundId!");
    }
    return await ctx.db.insert("tasks", {
      name: encryptText(args.name),
      description: encryptText(args.description || ""),
      isDone: args.isDone,
      deadline: args.deadline,
      priority: args.priority,
      playgroundId: args.playgroundId,
    });
  },
});

export const remove = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated!");
    }
    if (!args.taskId) {
      throw new Error("No taskId!");
    }
    return await ctx.db.delete(args.taskId);
  },
});

export const update = mutation({
  args: {
    taskId: v.id("tasks"),
    objects: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      isDone: v.optional(v.boolean()),
      priority: v.optional(v.string()),
      deadline: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated!");
    }
    if (!args.taskId) {
      throw new Error("No taskId!");
    }
    return await ctx.db.patch(args.taskId, { ...args.objects });
  },
});

export const get = query({
  args: {
    playgroundId: v.optional(v.id("playgrounds")),
  },
  handler: async (ctx, args) => {
    if (!args.playgroundId) {
      throw new Error("No playgroundId!");
    }
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("playgroundId"), args.playgroundId))
      .collect();
  },
});
