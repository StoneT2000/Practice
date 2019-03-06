package util;

public class QMath {

    public int sqdist(Position p1, Position p2) {
        int dx = p2.x - p1.x;
        int dy = p2.y - p1.y;
        return dx * dx + dy * dy;
    }
    public static double dist(Position p1, Position p2) {
        int dx = p2.x - p1.x;
        int dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    public static int manhattanDist(Position p1, Position p2) {
        int dx = p2.x - p1.x;
        int dy = p2.y - p1.y;
        return Math.abs(dx) + Math.abs(dy);
    }

}
