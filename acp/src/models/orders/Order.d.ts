declare class Order {
    id: number
    user_id: number
    timestamp: Date
    state: 'VALID' | 'INVALIDATED'
    menuOrders: MenuOrder[]
    productOrders: ProductOrder[]
}
