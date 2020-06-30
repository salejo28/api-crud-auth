import { Request, Response } from 'express';

import pool from '../database';

import { posts } from '../interface/posts'

class Posts {

    async getPosts(req: Request, res: Response) {

        const { id }: any = req.user

        const post = await pool.query('SELECT * FROM posts WHERE user_id = ?', [id])

        res.json({post: post})

    }

    async createPost(req: Request, res: Response) {

        const { title, description } = req.body;

        const { id }: any = req.user

        const newPost: posts = {
            title,
            description,
            user_id: id
        };

        await pool.query('INSERT INTO posts SET ?', [newPost]);

        res.json({ message: 'Create successfully'})

    }

    async updatePost(req: Request, res: Response) {

        let { id } = req.params;
        let { title, description } = req.body;

        const putPost = {
            title,
            description,
        }

        await pool.query('UPDATE posts set ? WHERE id = ?', [putPost, id])

        res.json({message: 'Updated successfully'});

    }

    async deletePost (req: Request, res: Response) {

        let { id } = req.params;
        await pool.query('DELETE FROM posts WHERE id = ?', [ id ]);

        res.json({
            message: 'Deleted successfully'
        })

    }

}

const posts = new Posts();

export default posts;