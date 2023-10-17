export async function getClosestCursor(
  prismaModel: any,
  cursor: number | undefined,
) {
  if (!cursor) return undefined;

  const cursorItem = await prismaModel.findUnique({
    where: { createdAt: cursor },
  });

  if (cursorItem) {
    return cursorItem.createdAt;
  }

  const closestHigher = await prismaModel.findFirst({
    where: { createdAt: { gt: cursor } },
    orderBy: { createdAt: "asc" },
  });

  if (closestHigher) closestHigher.createdAt;

  const closestLower = await prismaModel.findFirst({
    where: { createdAt: { lt: cursor } },
    orderBy: { createdAt: "desc" },
  });

  if (closestLower) closestLower.createdAt;

  return undefined;
}

export async function buildPaginationMeta<T>({
  model,
  cursor,
  take,
  all,
  total,
}: {
  model: any;
  cursor: number | undefined;
  take: number;
  all: T &
    {
      createdAt: string;
    }[];
  total: number;
}) {
  return {
    cursor,
    pageCount: Math.ceil((await model.count()) / take),
    pageIndex: Math.floor((cursor || 0) / take),
    pageSize: take,
    next: all.length === take ? all[all.length - 1]?.createdAt : undefined,
    prev: cursor && all.length > 0 ? cursor + take : undefined,
    total,
  };
}

export async function paginate<T>(input: {
  model: any;
  cursor: number | undefined;
  take: number;
  where?: any;
  include?: any;
}) {
  const cursor = await getClosestCursor(input.model, input.cursor);

  const all = await input.model.findMany({
    ...(cursor ? { cursor: { createdAt: cursor } } : {}),
    take: input.take,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: "desc" },
    where: input.where,
    include: input.include,
  });

  const total = await input.model.count({
    where: input.where,
  });

  const meta = await buildPaginationMeta<T>({
    model: input.model,
    take: input.take,
    cursor,
    all,
    total,
  });

  return { all, meta };
}
