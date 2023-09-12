import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    message: v.string(),
    playgroundId: v.id("playgrounds"),
    fromUser: v.id("users"),
    toUser: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called addMessage without authentication present");
    }
    return await ctx.db.insert("messages", {
      message: args.message,
      playgroundId: args.playgroundId,
      fromUser: args.fromUser,
      toUser: args.toUser,
    });
  },
});
