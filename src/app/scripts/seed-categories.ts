// TODO: Create a script to seed categories into the database

import { db } from '@/db';
import { categories } from '@/db/schema';

interface VideoCategoriesDictionary {
  [key: string]: string;
}

const videoCategories: VideoCategoriesDictionary = {
  'Cars and vehicles':
    'Videos related to cars, motorcycles, and other vehicles',
  'Comedy': 'Funny videos, sketches, and stand-up performances',
  'Education': 'Educational content, tutorials, and how-to videos',
  'Gaming': 'Gameplay, walkthroughs, and gaming reviews',
  'Entertainment':
    'General entertainment content, including shows and web series',
  'Film and animation': 'Short films, animations, and movie reviews',
  'How-to and style': 'Fashion, beauty, and lifestyle tutorials',
  'Music': 'Music videos, covers, and original compositions',
  'News and politics':
    'Current events, news analysis, and political commentary',
  'People and blogs': 'Personal vlogs, stories, and daily life content',
  'Pets and animals': 'Animal videos, pet care tips, and wildlife content',
  'Science and technology':
    'Tech reviews, science experiments, and innovations',
  'Sports': 'Sports highlights, analysis, and athlete interviews',
  'Travel and events': 'Travel vlogs, event coverage, and destination guides',
  'Food and drink': 'Cooking tutorials, recipes, and food reviews',
  'Health and fitness': 'Workout routines, health tips, and wellness advice',
  'Art and design': 'Art tutorials, design tips, and creative processes',
  'Beauty and fashion': 'Makeup tutorials, fashion hauls, and style tips',
  'Business and finance':
    'Business advice, financial tips, and market analysis',
  'DIY and crafts': 'Do-it-yourself projects, crafts, and home improvement',
  'Family and relationships':
    'Parenting tips, relationship advice, and family vlogs',
  'Home and garden': 'Home decor, gardening tips, and renovation projects',
  'Photography':
    'Photography tips, camera reviews, and photo editing tutorials',
  'Product reviews': 'Reviews of gadgets, products, and services',
  'Programming and tech': 'Coding tutorials, tech news, and software reviews',
  'Vlogs': 'Personal vlogs and lifestyle content',
  'Other': 'Miscellaneous videos that do not fit into other categories',
};

async function main() {
  console.log('Seeding categories...');

  try {
    const values = Object.entries(videoCategories).map(
      ([name, description]) => ({
        name,
        description,
      }),
    );

    await db.insert(categories).values(values);

    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

main();
