package models

import (
	"fmt"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	UserID    uint      `json:"user_id"`
	User      User      `json:"user"`
	Question  string    `json:"question"`
	Answer    string    `json:"answer"`
	Comments  []Comment `json:"comments"`
	Likes     []Like    `json:"likes"`
}

func (post *Post) Save() (*Post, error) {
	err := Database.Create(post).Error
	if err != nil {
		return &Post{}, err
	}

	return post, nil
}

func FetchAllPosts() (*[]Post, error) {
	var posts []Post
	err := Database.Find(&posts).Error

	fmt.Println(posts)

	if err != nil {
		return &[]Post{}, err
	}

	return &posts, nil
}

func FetchPostsByUserID(userID uint) (*[]Post, error) {
	var posts []Post
	err := Database.Where("user_id = ?", userID).Find(&posts).Error

	if err != nil {
		return &[]Post{}, err
	}

	return &posts, nil
}
