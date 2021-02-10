/**
 * Default interface for database models
 */
interface Model {
    /**
     * Deletes this model object from the database
     */
    delete(): Promise<void>

    /**
     * Updates this model object's fields in the database
     */
    update(): Promise<void>
}