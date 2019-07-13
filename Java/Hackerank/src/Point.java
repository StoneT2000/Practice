public class Point {
    int x1;
    int x2;

    Point(int x1, int x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
    Point (Point p) {
        this.x1 = p.x1;
        this.x2 = p.x2;
    }
}
