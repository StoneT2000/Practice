import util.*;

import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.io.PrintWriter;
public class Main {

    public static void main(String[] args) throws FileNotFoundException {
        System.out.println("Hello World!");

        Position start = new Position(27,4, 0, 0,null);
        Position end = new Position(59,61,0, 0,null);
        start.priority = QMath.manhattanDist(start, end);
        //generate a random map
        MapGenerator mapgen = new MapGenerator(64, 64, 2, 4, 0.42f, 2);
        long seed = 78912383;
        int[][] gameMap = mapgen.generateMap(seed);
        PrintWriter out0 = new PrintWriter("MapVisualizer/scripts/mapData.js");
        out0.println("var mapData = [");
        for (int[] a: gameMap) {
            out0.println(Arrays.toString(a) + ",");
        }
        out0.println("]");
        out0.close();

        System.out.println("Setup for pathing from " + start.toString(false, false) + " to " + end.toString(false, false));
        long stime = System.currentTimeMillis();
        Astar aStar = new Astar(start, end, gameMap);
        List<Position> path = aStar.findPath();
        if (path.size() == 0) {
            System.out.println("There's no path");
        }
        long ftime = System.currentTimeMillis();
        System.out.println("Search took " + (ftime - stime) + " ms");
        //System.out.println("Path: " + path.toString());
        System.out.println("Distance: " + path.size());
        //Display path onto map
        for (Position a : path) {
            gameMap[a.y][a.x] = 4;
        }
        gameMap[end.y][end.x] = 3;
        PrintWriter out = new PrintWriter("MapVisualizer/scripts/mapData.js");
        out.println("var mapData = [");
        for (int[] a : gameMap) {
            System.out.println(Arrays.toString(a) + ",");
            out.println(Arrays.toString(a) + ",");
        }
        out.println("]");
        out.close();

    }
}
