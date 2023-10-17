import { fillInGraphData } from "../lib/graphs";
import { adminProcedure, createTRPCRouter } from "../trpc";

const pxyzHeaders = () => {
  return {
    "x-protocol-public-key": process.env.PXYZ_PUBLIC_KEY ?? "",
    "x-protocol-secret-key": process.env.PXYZ_SECRET_KEY ?? "",
  };
};

const getPxyzAuthStats = async () => {
  try {
    const stats = await fetch(
      `https://api.pxyz.dev/api/v0/auth/stats?tenantId=${process.env.PXYZ_TENANT_ID}`,
      {
        headers: pxyzHeaders(),
      },
    );

    return await stats.json();
  } catch (err) {
    console.log("ERROR GETTING AUTH STATS");
    console.log(err);
    return {};
  }
};

const getPxyzAuthSignupsByDay = async () => {
  const stats = await fetch(
    `https://api.pxyz.dev/api/v0/auth/stats/sign-ups-by-day?tenantId=${process.env.PXYZ_TENANT_ID}`,
    {
      headers: pxyzHeaders(),
    },
  );

  return await stats.json();
};

const getPxyzAuthSigninsByDay = async () => {
  const stats = await fetch(
    `https://api.pxyz.dev/api/v0/auth/stats/sessions-by-day?tenantId=${process.env.PXYZ_TENANT_ID}`,
    {
      headers: pxyzHeaders(),
    },
  );

  return await stats.json();
};

export const statsRouter = createTRPCRouter({
  stats: adminProcedure.query(async ({ ctx }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const numProjects = await ctx.prisma.project.count();
    const numProjectsAsOf30DaysAgo = await ctx.prisma.project.count({
      where: {
        createdAt: {
          lte: thirtyDaysAgo,
        },
      },
    });

    const numProjectsInLast30Days = numProjects - numProjectsAsOf30DaysAgo;

    const authStats = await getPxyzAuthStats();
    const signUpsAuthStat = authStats?.find(
      (stat: any) => stat.name === "Sign Ups",
    );
    const totalUserAuthStat = authStats?.find(
      (stat: any) => stat.name === "Total Users",
    );
    const sessionsAuthStats = authStats?.find(
      (stat: any) => stat.name === "Sign Ins",
    );

    return [
      {
        title: "Total Users",
        value: totalUserAuthStat.value ?? 0,
        change: totalUserAuthStat.change ?? 0,
      },
      {
        title: "Sign Ups",
        value: signUpsAuthStat.value ?? 0,
        change: signUpsAuthStat.change ?? 0,
      },
      {
        title: "Sign Ins",
        value: sessionsAuthStats.value ?? 0,
        change: sessionsAuthStats.change ?? 0,
      },

      {
        title: "Projects",
        value: numProjects,
        change: numProjectsInLast30Days,
      },
    ];
  }),

  authByDay: adminProcedure.query(async ({ ctx }) => {
    const signupsByDay = await getPxyzAuthSignupsByDay();
    const signinsByDay = await getPxyzAuthSigninsByDay();

    return {
      signups: signupsByDay,
      signins: signinsByDay,
    };
  }),

  byDay: adminProcedure.query(async ({ ctx }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const projectsByDay = (await ctx.prisma
      .$queryRaw`SELECT COUNT(*) AS count, DATE_TRUNC('day', "createdAt") AS "createdAt" FROM "Project" WHERE "createdAt" >= DATE(${thirtyDaysAgo.toISOString()})  GROUP BY DATE_TRUNC('day', "createdAt") ORDER BY DATE_TRUNC('day', "createdAt") ASC`) as {
      count: bigint;
      createdAt: Date;
    }[];

    const projectsByDayFilled = fillInGraphData(projectsByDay, { days: 30 });

    return {
      projects: projectsByDayFilled,
    };
  }),
});
