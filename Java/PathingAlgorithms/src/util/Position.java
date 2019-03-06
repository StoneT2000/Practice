package util;

import java.util.ArrayList;
import java.util.List;

public class Position {
    public int x;
    public int y;
    public Position parent = null;
    public int cost;
    public double priority;
    public boolean passable = true;
    public Position(int xpos, int ypos, int cost, double priority, Position thisparent) {
        this.x = xpos;
        this.y = ypos;
        this.cost = cost;
        this.parent = thisparent;
        this.priority = priority;
    }

    public void setCost(int newC) {
        this.cost = newC;
    }
    public void setPassable(boolean passable) {
        this.passable = passable;
    }

    public Position getParent() {
        return parent;
    }

    public String toString(boolean costs, boolean showparent) {
        String str = new String("(" + this.x + ", " + this.y + ")");
        if (costs == true){
            str = str.concat("; Cost: " + this.cost);
        }
        if (showparent == true) {
            if (this.parent !=  null) {
                str = str.concat("; Parent: " + this.parent.toString(false, false));
            }
            else {
                str = str.concat("; Parent: none");
            }
        }
        return str;
    }
    public String toString(){
        String str = new String("(" + this.x + ", " + this.y + ")");
        return str;
    }
    public ArrayList<Position> getNeighbors() {

        ArrayList<Position> neighbors = new ArrayList<>(4);
        neighbors.add(new Position(this.x + 1, this.y, this.cost + 1, this.priority, this));
        neighbors.add(new Position(this.x, this.y + 1, this.cost + 1, this.priority, this));
        neighbors.add(new Position(this.x - 1, this.y, this.cost + 1, this.priority, this));
        neighbors.add(new Position(this.x, this.y - 1, this.cost + 1, this.priority, this));
        //noticed: setting the following as this.cost + 2 increases search time;
        //it causes us to take more considerations of other viable paths whereas this.cost + 1 is fairly direct, a unit can directly move diagonally and what not and reach the target faster
        neighbors.add(new Position(this.x + 1, this.y + 1, this.cost + 2, this.priority, this));
        neighbors.add(new Position(this.x - 1, this.y + 1, this.cost + 2, this.priority, this));
        neighbors.add(new Position(this.x - 1, this.y - 1, this.cost + 2, this.priority, this));
        neighbors.add(new Position(this.x + 1, this.y - 1, this.cost + 2, this.priority, this));
        return neighbors;

    }

    public boolean equals(Position opos) {
        if (this.x == opos.x && this.y == opos.y) {
            return true;
        }
        return false;
    }
}
