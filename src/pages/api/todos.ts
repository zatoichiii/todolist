import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newTodo = req.body;

    const fileData = fs.readFileSync(dataPath, 'utf8');
    const todos = JSON.parse(fileData);

    todos.push(newTodo);

    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));

    res.status(200).json(todos);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`errror`);
  }
}