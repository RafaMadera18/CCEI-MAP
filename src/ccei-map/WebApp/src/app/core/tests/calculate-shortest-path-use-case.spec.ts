import { TestBed } from "@angular/core/testing";
import { Graph } from "@data/model/Grafo";
import { Connection } from "@data/model/Connection";
import { IntersectionNode } from "@data/model/IntersectionNode";

import {
  CalculateShortestPathUseCase,
  CalculateShortestPathUseCaseImpl,
} from "@use-cases/.";

describe("CalculateShortestPathUseCaseImpl", () => {
  let useCase: CalculateShortestPathUseCase;
  let graph: Graph;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculateShortestPathUseCaseImpl],
    });

    useCase = TestBed.inject(CalculateShortestPathUseCaseImpl);
    graph = new Graph();
  });

  function addNode(id: string): void {
    graph.addNode(new IntersectionNode(id, { x: 0, y: 0 }));
  }

  function connect(a: string, b: string, dist: number): Connection {
    const c = new Connection(a, b, dist);
    graph.addConnection(c);
    return c;
  }

  it("should return empty path if start and end are the same", () => {
    addNode("A");

    const path = useCase.execute("A", "A", graph);

    expect(path.length).toBe(0);
  });

  it("should return the direct connection when only one edge exists", () => {
    addNode("A");
    addNode("B");

    const conn = connect("A", "B", 10);

    const path = useCase.execute("A", "B", graph);

    expect(path.length).toBe(1);
    expect(path[0]).toBe(conn);
  });

  it("should return an empty array if no path exists", () => {
    addNode("A");
    addNode("B");
    addNode("C");

    connect("A", "B", 2);

    const path = useCase.execute("A", "C", graph);

    expect(path).toEqual([]);
  });

  it("should return the shortest among multiple possible paths", () => {
    addNode("A");
    addNode("B");
    addNode("C");
    addNode("D");

    const ab = connect("A", "B", 5);
    const bd = connect("B", "D", 5);

    connect("A", "C", 3);
    connect("C", "D", 20);

    const path = useCase.execute("A", "D", graph);

    expect(path.length).toBe(2);
    expect(path[0]).toBe(ab);
    expect(path[1]).toBe(bd);
  });

  it("should choose path with smallest distance", () => {
    addNode("A");
    addNode("B");
    addNode("C");
    addNode("D");

    const ac = connect("A", "C", 1);
    const cd = connect("C", "D", 1);

    connect("A", "B", 1);
    connect("B", "D", 10);

    const path = useCase.execute("A", "D", graph);

    expect(path.length).toBe(2);
    expect(path[0]).toBe(ac);
    expect(path[1]).toBe(cd);
  });
});
