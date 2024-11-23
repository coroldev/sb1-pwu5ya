import express from 'express';
import { z } from 'zod';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { upload, processImage } from '../middleware/upload';
import db from '../db';

const router = express.Router();

// Schemas for validation
const practiceAreaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1)
});

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  linkedin_url: z.string().url().optional(),
  twitter_url: z.string().url().optional(),
  email: z.string().email().optional()
});

const blogPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().min(1),
  published: z.boolean().default(false)
});

const aboutContentSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  section: z.string().min(1)
});

// Practice Areas Routes
router.post('/practice-areas', 
  authenticate, 
  authorize(['admin', 'editor']), 
  async (req: AuthRequest, res) => {
    try {
      const data = practiceAreaSchema.parse(req.body);
      db.run(`
        INSERT INTO practice_areas (title, description, icon)
        VALUES (?, ?, ?)
      `, [data.title, data.description, data.icon], (err) => {
        if (err) {
          res.status(500).json({ error: 'Error creating practice area' });
        } else {
          res.status(201).json({ message: 'Practice area created successfully' });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error creating practice area' });
      }
    }
});

// Team Members Routes
router.post('/team-members',
  authenticate,
  authorize(['admin', 'editor']),
  upload.single('image'),
  async (req: AuthRequest, res) => {
    try {
      const data = teamMemberSchema.parse(req.body);
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const processedImagePath = await processImage(req.file);
      
      db.run(`
        INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        data.name,
        data.role,
        data.bio,
        processedImagePath,
        data.linkedin_url,
        data.twitter_url,
        data.email
      ], (err) => {
        if (err) {
          res.status(500).json({ error: 'Error creating team member' });
        } else {
          res.status(201).json({ message: 'Team member created successfully' });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error creating team member' });
      }
    }
});

// Blog Posts Routes
router.post('/blog-posts',
  authenticate,
  authorize(['admin', 'editor']),
  upload.single('image'),
  async (req: AuthRequest, res) => {
    try {
      const data = blogPostSchema.parse(req.body);
      if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const processedImagePath = await processImage(req.file);
      
      db.run(`
        INSERT INTO blog_posts (title, content, excerpt, image_url, author_id, published)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        data.title,
        data.content,
        data.excerpt,
        processedImagePath,
        req.user!.id,
        data.published
      ], (err) => {
        if (err) {
          res.status(500).json({ error: 'Error creating blog post' });
        } else {
          res.status(201).json({ message: 'Blog post created successfully' });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error creating blog post' });
      }
    }
});

// About Content Routes
router.post('/about-content',
  authenticate,
  authorize(['admin']),
  async (req: AuthRequest, res) => {
    try {
      const data = aboutContentSchema.parse(req.body);
      db.run(`
        INSERT INTO about_content (title, content, section)
        VALUES (?, ?, ?)
      `, [data.title, data.content, data.section], (err) => {
        if (err) {
          res.status(500).json({ error: 'Error creating about content' });
        } else {
          res.status(201).json({ message: 'About content created successfully' });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error creating about content' });
      }
    }
});

// GET routes for each content type
router.get('/practice-areas', async (req, res) => {
  db.all('SELECT * FROM practice_areas', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching practice areas' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/team-members', async (req, res) => {
  db.all('SELECT * FROM team_members', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching team members' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/blog-posts', async (req, res) => {
  db.all(`
    SELECT bp.*, u.email as author_email
    FROM blog_posts bp
    JOIN users u ON bp.author_id = u.id
    WHERE bp.published = 1
    ORDER BY bp.created_at DESC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching blog posts' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/about-content', async (req, res) => {
  db.all('SELECT * FROM about_content', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching about content' });
    } else {
      res.json(rows);
    }
  });
});

export default router;