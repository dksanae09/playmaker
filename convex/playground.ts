import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    owner: v.id("users"),
    editor: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called createPlayground without authentication present");
    }
    return await ctx.db.insert("playgrounds", {
      name: args.name,
      description: args.description,
      owner: args.owner,
      editor: args.editor,
    });
  },
});

export const get = query({
  args: {
    playgroundId: v.id("playgrounds"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.playgroundId);
  },
});

export const listActive = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      throw new Error("Called listActivePlaygrounds without userId");
    }
    const owners = await ctx.db
      .query("playgrounds")
      .filter((q) => q.eq(q.field("owner"), args.userId))
      .collect();
    const editors = await ctx.db
      .query("playgrounds")
      .filter((q) => q.eq(q.field("editor"), args.userId))
      .collect();
    return owners.concat(editors);
  },
});
