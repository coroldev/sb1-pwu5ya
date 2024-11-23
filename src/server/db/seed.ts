import db from './index';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    // Clear existing data
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        db.run('DELETE FROM blog_posts');
        db.run('DELETE FROM about_content');
        db.run('DELETE FROM team_members');
        db.run('DELETE FROM practice_areas');
        db.run('DELETE FROM users');
        db.run('COMMIT', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    // Create admin user first
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await new Promise<number>((resolve, reject) => {
      db.run(`
        INSERT INTO users (email, password, role)
        VALUES (?, ?, ?)
      `, ['admin@justice.com', hashedPassword, 'admin'], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    }).then((adminUserId) => {
      // After admin user is created, seed other content
      seedContent(adminUserId);
    });

  } catch (error) {
    console.error('Error in initial seeding:', error);
  }
}

function seedContent(adminUserId: number) {
  try {
    // Seed practice areas
    const practiceAreas = [
      {
        title: 'Corporate Law',
        description: 'Expert legal solutions for businesses of all sizes, from startups to corporations.',
        icon: 'Building2'
      },
      {
        title: 'Family Law',
        description: 'Compassionate legal support for family matters including divorce, custody, and adoption.',
        icon: 'Users2'
      },
      {
        title: 'Criminal Defense',
        description: 'Strong advocacy and defense strategies in criminal cases.',
        icon: 'Scale'
      }
    ];

    practiceAreas.forEach(area => {
      db.run(`
        INSERT INTO practice_areas (title, description, icon)
        VALUES (?, ?, ?)
      `, [area.title, area.description, area.icon]);
    });

    // Seed team members
    const teamMembers = [
      {
        name: 'Sarah Johnson',
        role: 'Managing Partner',
        bio: 'Over 20 years of experience in corporate law',
        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        linkedin_url: 'https://linkedin.com',
        twitter_url: 'https://twitter.com',
        email: 'sarah@justice.com'
      },
      {
        name: 'Michael Chen',
        role: 'Senior Partner',
        bio: 'Specialist in real estate and corporate law',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
        linkedin_url: 'https://linkedin.com',
        twitter_url: 'https://twitter.com',
        email: 'michael@justice.com'
      }
    ];

    teamMembers.forEach(member => {
      db.run(`
        INSERT INTO team_members (name, role, bio, image_url, linkedin_url, twitter_url, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [member.name, member.role, member.bio, member.image_url, member.linkedin_url, member.twitter_url, member.email]);
    });

    // Seed blog posts
    const blogPosts = [
      {
        title: 'Understanding Corporate Law Basics',
        content: 'Detailed content about corporate law basics...',
        excerpt: 'A comprehensive guide to the fundamentals of corporate law and its impact on businesses.',
        image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
        published: true
      },
      {
        title: 'Family Law: Navigating Divorce Proceedings',
        content: 'Detailed content about divorce proceedings...',
        excerpt: 'Essential information about divorce proceedings and what to expect during the process.',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        published: true
      }
    ];

    blogPosts.forEach(post => {
      db.run(`
        INSERT INTO blog_posts (title, content, excerpt, image_url, author_id, published)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [post.title, post.content, post.excerpt, post.image_url, adminUserId, post.published]);
    });

    // Seed about content
    const aboutContent = [
      {
        title: 'Our History',
        content: 'Founded in 1998, our firm has grown from a small practice to one of the most respected legal institutions in the region.',
        section: 'history'
      },
      {
        title: 'Our Mission',
        content: 'To provide exceptional legal services with integrity and dedication to our clients.',
        section: 'mission'
      }
    ];

    aboutContent.forEach(content => {
      db.run(`
        INSERT INTO about_content (title, content, section)
        VALUES (?, ?, ?)
      `, [content.title, content.content, content.section]);
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Start seeding
seedDatabase();