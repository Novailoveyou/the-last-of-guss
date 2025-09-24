export type PointStore = {
  point: {
    points: number
    multiplier: number
    addPoint: () => void
    setPoints: (points: number) => void
  }
}
