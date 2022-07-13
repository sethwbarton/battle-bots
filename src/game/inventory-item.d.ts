export interface InventoryItem {
  name: string
  value?: number
  type: 'key' | 'weapon' | 'potion' | 'gold'
}
