import prisma  from "@/lib/prisma";

// User 
function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}


// blacklist
function getBlacklistDetails(userId: string) {
  return prisma.blacklistUsers.findUnique({
    where: { userId: userId },
  });
}

function isUserBlacklisted(userId: string) {
  return prisma.blacklistUsers.findFirst({
    where: { userId: userId },
  }).then(blacklist => !!blacklist);
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

    // Blacklist functions
    getBlacklistDetails,
    isUserBlacklisted,
    blacklistUser
}
