export type RoundStore = {
  round: {
    rounds: {
      id: string
      startAt: Date
      endAt: Date
    }[]
    setRounds: (rounds: RoundStore['round']['rounds']) => void
    addRound: (round: RoundStore['round']['rounds'][number]) => void
    round: {
      id: string
      startAt: Date
      endAt: Date
      points: {
        value: number
        survivorId: string
      }[]
    } | null
    setRound: (round: RoundStore['round']['round']) => void
  }
}
