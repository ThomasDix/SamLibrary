package com.example.library.model;

/**
 * Represents a user of the library platform.
 */
public class User {

    /**
     * Unique identifier for the user.
     */
    private final String userId;

    /**
     * Name of the user.
     */
    private final String name;



    /**
     * Path of the profile image file for the user.
     */
    private final String profileImagePath;

    /**
     * Constructs a User with specified details.
     *
     * @param userId           the unique identifier of the user
     * @param name             the name of the user
     * @param profileImagePath the path of the profile image file for the user
     */
    public User(String userId, String name, String profileImagePath) {
        this.userId = userId;
        this.name = name;
        this.profileImagePath = profileImagePath;
    }

    /**
     * Constructs a User with specified details.
     *
     * @param userId           the unique identifier of the user
     * @param name             the name of the user
     * @param profileImagePath the path of the profile image file for the user
     */
    public User(String userId, String name) {
        this(userId, name, getAvatarPath(userId));
    }

    /**
     * Given a userId generate a valid avatar path.
     */
    private static String getAvatarPath(String userId) {
        int fileNo = (userId.hashCode() % 20) + 1;
        String avatarFileName = String.format("avatar_%d.png", fileNo);
        return "/avatars/" + avatarFileName;
    }

    /**
     * Returns the user ID.
     *
     * @return the user ID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * Returns the name of the user.
     *
     * @return the name of the user
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the path of the profile image file for the user.
     *
     * @return the profile image path
     */
    public String getProfileImagePath() {
        return profileImagePath;
    }
}