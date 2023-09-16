import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    message: v.string(),
    playgroundId: v.union(v.id("playgrounds"), v.null()),
    fromUser: v.id("users"),
    toUser: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called addMessage without authentication present");
    }
    if (args.playgroundId === null) {
      throw new Error("Called addMessage without playgroundId present");
    }

    return await ctx.db.insert("messages", {
      message: args.message,
      playgroundId: args.playgroundId,
      fromUser: args.fromUser,
      toUser: args.toUser,
    });
  },
});

export const get = query({
  args: {
    playgroundId: v.union(v.id("playgrounds"), v.null()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called getMessages without authentication present");
    }
    if (args.playgroundId === null) {
      throw new Error("Called getMessages without playgroundId present");
    }
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("playgroundId"), args.playgroundId))
      .collect();
  },
});
