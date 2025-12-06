import { z } from 'zod';

export const recommendationSchema = z.object({
  description: z.string().min(3).max(800),
  lengthPref: z.enum(['long', 'medium', 'short']).optional(),
  platform: z.enum(['jjwxc', 'qidian', 'changpei', 'other', 'any']).optional(),
  moodTags: z.array(z.string().min(1).max(20)).max(10).optional(),
  completion: z.enum(['completed', 'ongoing', 'any']).optional(),
  page: z.number().int().min(1).max(50).optional(),
  pageSize: z.number().int().min(1).max(50).optional(),
});

export const feedbackSchema = z.object({
  action: z.enum(['like', 'dislike', 'bookmark', 'variant']),
});
