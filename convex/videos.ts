import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendVideo = mutation({
  args: {
    storageId: v.string(),
    userId: v.id("users"),
    playgroundId: v.id("playgrounds"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("videos", {
      body: args.storageId,
      userId: args.userId,
      playgroundId: args.playgroundId,
      format: "video",
    });
  },
});

const list = query({
  args: {
    playgroundId: v.id("playgrounds"),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("playgroundId"), args.playgroundId))
      .first();
    return video;
  },
});

export const renderVideo = query({
  args: {
    playgroundId: v.id("playgrounds"),
  },
  handler: async (ctx, args) => {
    const video = await list(ctx, args);
    if (!video) {
      return null;
    }
    const url = await ctx.storage.getUrl(video.body);
    return url;
  },
});
