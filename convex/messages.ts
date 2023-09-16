import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import AES from "crypto-js/aes";

export default function encryptText(text: string) {
  const encryptText = AES.encrypt(text, process.env.NEXTAUTH_SECRET || "");
  return encryptText.toString();
}

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
    const encrypted = encryptText(args.message);
    return await ctx.db.insert("messages", {
      message: encrypted,
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
