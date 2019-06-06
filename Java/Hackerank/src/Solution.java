import java.util.*;
import java.lang.*;
import java.math.*;
public class Solution {
    public static void main(String[] args) {

        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7}));

    }
    static public int maxArea(int[] height) {
        int max = 0;
        for (int i = 0; i < height.length; i++) {

            int l1 = height[i];
            int prevMaxHeight = -1;
            for (int j = height.length -1; j > i; j--) {

                int r1 = height[j];
                //System.out.println("Compare: " + i + ", " + j);
                if ( r1 > prevMaxHeight) {
                    prevMaxHeight = r1;
                }
                else {
                    continue;
                }
                int area = (j-i) * ((int) Math.min(r1,l1));
                //System.out.pripublic int maxArea(int[] height) {
                //        int max = 0;
                //        for (int i = 0; i < height.length; i++) {
                //
                //            int l1 = height[i];
                //            int prevMaxHeight = -1;
                //            for (int j = height.length -1; j > i; j--) {
                //
                //                int r1 = height[j];
                //                //System.out.println("Compare: " + i + ", " + j);
                //                if ( r1 > prevMaxHeight) {
                //                    prevMaxHeight = r1;
                //                }
                //                else {
                //                    continue;
                //                }
                //                int area = (j-i) * ((int) Math.min(r1,l1));
                //                //System.out.println("AREA: " +area);
                //                max = Math.max(area, max);
                //            }
                //
                //        }
                //        return max;
                //    }ntln("AREA: " +area);
                max = Math.max(area, max);
            }

        }
        return max;
    }
}
