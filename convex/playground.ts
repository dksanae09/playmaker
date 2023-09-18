import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    deadline: v.string(),
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
      deadline: args.deadline,
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

export const getTop = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      console.log("Called getTopPlaygrounds without authentication present");
      return [];
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();
    if (!user) {
      console.log("User not found!");
      return [];
    }
    const playgrounds = await ctx.db
      .query("playgrounds")
      .filter((q) =>
        q.or(
          q.eq(q.field("owner"), user._id),
          q.eq(q.field("editor"), user._id),
        ),
      )
      .collect();
    return playgrounds.slice(0, args.limit || 5);
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
