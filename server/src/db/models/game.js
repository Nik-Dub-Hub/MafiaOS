static async update(id, data) {
  const game = await this.getById(id);
  if (!game) {
    return null;
  }
  game.phase = data.phase;
  game.isReady = data.isReady
  game.discussionTime = data.discussionTime;
  await game.save();
  return game;
}