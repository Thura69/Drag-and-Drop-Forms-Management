"use server";

import prisma from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error { };

export async function GetFormStats() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    const status = prisma?.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions:true
        }
    })

    const visits = (await status)?._sum.visits || 0;
    const submisions = (await status)?._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submisions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submisions,
        submissionRate,
        bounceRate
    }
}