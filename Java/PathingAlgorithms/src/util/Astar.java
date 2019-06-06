package util;
import java.util.*;

import static util.QMath.*;

public class Astar {
    private PriorityQueue<Position> frontier;
    private Set<Position> visited;
    private Position start;
    private Position end;
    private int width;
    private int height;
    public Astar(Position start, Position end, int[][] map) {

        //frontier is a priority queue where we add new positions on the map to search through.
        //It is ordered by which position has the lowest cost value, determined by the heuristic:
        //Cost = Cost so far + distance left to target
        frontier = new PriorityQueue<Position>(new Comparator<Position>() {
            @Override
            public int compare(Position o1, Position o2) {
                return Double.compare(o1.priority, o2.priority);
            }
        });
        this.start = start;
        this.end = end;
        if (map[start.y][start.x] == 1) {
            throw new Error("Starting position is not passable");
        }
        if (map[end.y][end.x] == 1) {
            throw new Error("Target position is not passable");
        }
        visited = new HashSet<>();
        //System.out.println("Setup for pathing from " + start.toString(false, false) + " to " + end.toString(false, false));
        this.initializeMap(map);

        frontier.add(this.map[start.y][start.x]);
    }

    private static Position[][] map;

    private void initializeMap(int[][] givenMap) {
        this.height = givenMap.length;
        this.width = givenMap[0].length;
        this.map = new Position[height][width];

        givenMap[start.y][start.x] = 2;
        givenMap[end.y][end.x] = 3;

        for (int i = 0; i < this.height; i++){
            for (int j = 0; j < this.width; j++) {
                Position storePos = new Position(j, i, 0, 0, null);
                if (givenMap[i][j] == 1) {
                    storePos.setPassable(false);
                    //System.out.println(storePos.toString() + " is blocked");
                }
                this.map[i][j] = storePos;


            }

        }
    }

    public List<Position> findPath() {
        ArrayList<Position> path = new ArrayList<Position>();

        //run a BFS
        while(!frontier.isEmpty()) {
            Position checkPos = frontier.poll();
            visited.add(checkPos);

            if (checkPos.equals(end)) {
                return getPath(checkPos);
            }

            ArrayList<Position> neighbors = checkPos.getNeighbors();
            for (int i = 0; i < neighbors.size(); i++) {
                Position newPos = neighbors.get(i);
                if (inMap(newPos.x, newPos.y)) {
                    //We use these cached positions as we to achieve O(1) look up in visited and
                    //frontier to see if its already searched or in frontier
                    Position cachedNewPos = this.map[newPos.y][newPos.x];
                    //Check if position is passable, hasn't been visited, and isn't in the frontier already.
                    if (cachedNewPos.passable){
                        int newCost = newPos.cost;
                        if ((!visited.contains(cachedNewPos) && !frontier.contains(cachedNewPos)) || newCost < cachedNewPos.cost) {
                            //We add a new position to the frontier if
                            //The cost is lower, we reset the cost of the old position reached from another path,
                            //so its parent and cost are optimal
                            //If it hasn't been visited or wasn't added to the frontier yet, we look at it.

                            cachedNewPos.cost = newPos.cost;
                            cachedNewPos.priority = cachedNewPos.cost + QMath.dist(cachedNewPos, this.end);
                            cachedNewPos.parent = checkPos;
                            frontier.add(cachedNewPos);
                        }
                    }
                }



            }
        }
        //if we never reach the target, return no path
        return path;
    }

    public List<Position> getPath(Position end) {
        Position cPos = end;
        List<Position> path = new ArrayList<Position>();
        while (cPos.parent != null) {
            path.add(cPos);
            cPos = cPos.parent;
        }
        return path;
        //System.out.println(path.toString());
    }

    private boolean inMap(int x, int y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height){
            return false;
        }
        return true;
    }

}
