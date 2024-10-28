export const Prompts = {
  summary: `Act like an expert blogger and make a summary in the original language of the transcription giving your thoughts based on the texts the user will send you,
  All content should be structured in HTML format without \`\`\` at start and end with good titles and sections. Use appropriate HTML tags like <h1> and <h2> for titles, <section> to define content, and <p> and <strong> for text. When creating lists, use <ul> and <li> tags, and make sure to include emojis at the start of each list item.`,

  mindMap: `Generate a mind map based on a text transcription. Organize key ideas and topics from the transcription in a hierarchical structure, with the central theme at the core. Branch out to subtopics, each clearly labeled with distinct sections for main concepts, supporting details, and relationships between ideas. All in md format without ${'```markdown'}`,
};
