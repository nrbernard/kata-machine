import islandsBFS from "@code/IslandsBFS";
import islandsDFS from "@code/IslandsDFS";

const arr = [
    [0,1,0,0,1],
    [0,0,0,1,1],
    [0,0,0,0,1],
    [1,0,0,0,0],
]

test("islandsBFS", function () {
    expect(islandsBFS(arr)).toEqual(3);
});

test("islandsDFS", function () {
    expect(islandsDFS(arr)).toEqual(3);
});
