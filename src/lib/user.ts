import prisma  from "@/lib/prisma";

// User 
function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}


// blacklist
function isUserBlacklisted(userId: string) {
  return prisma.blacklistUsers.findUnique({
    where: { userId: userId },
  });
}

function blacklistUser(userId: string, reason: string = "none", byAdmin: boolean = false) {
    return prisma.blacklistUsers.create({
        data: { 
            userId: userId,
            reason: reason,
            byAdmin: byAdmin
        },
    });
}


export {
    getUserById,
    isUserBlacklisted,
    blacklistUser
}
