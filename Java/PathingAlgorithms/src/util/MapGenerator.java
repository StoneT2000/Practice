package util;
import java.util.Random;
public class MapGenerator {

    private float chanceToStartAlive;
    private int width;
    private int height;
    private int deathLimit;
    private int birthLimit;
    private int padding = 0;
    private int numSteps;
    public MapGenerator(int width, int height, int deathLimit, int birthLimit, float chanceToStartAlive, int numSteps) {
        this.width = width;
        this.height = height;
        this.deathLimit = deathLimit;
        this.birthLimit = birthLimit;
        this.chanceToStartAlive = chanceToStartAlive;
        this.numSteps = numSteps;
    }

    public int[][] initializeMap(int[][] map, long seed){
        Random generator = new Random(seed);
        for(int y = padding; y < this.height - padding; y++){
            for(int x = 0; x < this.width; x++){
                if (generator.nextDouble() < this.chanceToStartAlive) {
                    map[y][x] = 1;
                } else {
                    map[y][x] = 0;
                }

            }
        }
        return map;
    }
    public int[][] doSimulationStep(int[][] oldMap) {
        int[][] newMap = new int[this.height][this.width];
        for(int y = padding; y < this.height - padding; y++){
            for(int x = padding; x < this.width - padding; x++){
                int nbs = numAliveNeighbors(oldMap, x, y);
                if (oldMap[y][x] == 1) {
                    if (nbs < this.deathLimit) {
                        newMap[y][x] = 0;
                    }
                    else {
                        newMap[y][x] = 1;
                    }
                }
                else {
                    if (nbs > this.birthLimit) {
                        newMap[y][x] = 1;
                    }
                    else {
                        newMap[y][x] = 0;
                    }
                }
            }
        }
        return newMap;

    }
    public int[][] generateMap(long seed) {
        int[][] finalMap = new int[this.height][this.width];

        finalMap = initializeMap(finalMap, seed);
        for (int i = 0; i < this.numSteps; i++) {
            finalMap = doSimulationStep(finalMap);
        }

        return finalMap;
    }
    public int numAliveNeighbors(int[][] map, int x, int y) {
        int count = 0;
        for (int i = -1; i < 2; i++) {
            for (int j = -1; j < 2; j++) {
                int nx = x + i;
                int ny = y + j;
                if (i == 0 && j == 0) {

                }
                else if (!inMap(nx, ny) || map[ny][nx] == 1) {
                    count += 1;
                }
            }
        }

        return count;
    }
    private boolean inMap(int x, int y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height){
            return false;
        }
        return true;
    }

}
