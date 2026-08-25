import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import Blog from '../models/postModel.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndownService.use(gfm);

const convertBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const blogs = await Blog.find({});
    console.log(`Found ${blogs.length} blogs to check`);

    let convertedCount = 0;
    for (const blog of blogs) {
      if (blog.content && (blog.content.includes('<p>') || blog.content.includes('<div>'))) {
        console.log(`Converting blog: ${blog.title}`);
        const markdown = turndownService.turndown(blog.content);
        blog.content = markdown;
        await blog.save();
        convertedCount++;
      } else {
        console.log(`Skipping blog (already markdown): ${blog.title}`);
      }
    }

    console.log(`Successfully converted ${convertedCount} blogs to markdown.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

convertBlogs();
