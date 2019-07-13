public class Solution {

    public static void main(String[] args) {
        System.out.println("Hlo World!");
        Point p1 = new Point(420,42);
        Point p2 = new Point(p1);
        Point p3 = p2;
        System.out.println(p1.equals(p2));
        System.out.println(p1.equals(p3));
        System.out.println(p2.equals(p3));
    }
}
