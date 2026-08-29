/**
 * Column classes for a card grid, chosen from how many cards there are.
 *
 * Project counts change as teams start and finish, and a three-column grid
 * holding two cards leaves a conspicuous hole. Deriving the columns keeps the
 * layout composed whether the chapter is running two projects or six.
 */
export const projectGrid = (count: number): string =>
  count >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
