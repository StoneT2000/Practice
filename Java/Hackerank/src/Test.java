import java.util.Arrays;
import java.util.Collections
import java.util.Comparator;

public class Test {
    public static void main(String[] args) {
        int[] scores = {100,90,90};
        int[] alice = {5,105,50,90,10};
        climbingLeaderboard(scores, alice);
    }
    static int[] climbingLeaderboard(int[] scores, int[] alice) {
        int[] res = new int[alice.length];
        Arrays.sort(alice);
        int scorePos = scores.length;
        for (int i = 0; i < alice.length; i++) {

        }
        return res;
    }
}
