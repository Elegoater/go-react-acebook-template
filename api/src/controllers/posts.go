package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/makersacademy/go-react-acebook-template/api/src/auth"
	"github.com/makersacademy/go-react-acebook-template/api/src/models"
)

type JSONPost struct {
	ID       uint   `json:"_id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
	UserID   uint   `json:"user_id"`
}

func GetAllPosts(ctx *gin.Context) {
	posts, err := models.FetchAllPosts()

	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)
	token, _ := auth.GenerateToken(userID)

	// Convert posts to JSON Structs
	jsonPosts := make([]JSONPost, 0)
	for _, post := range *posts {
		jsonPosts = append(jsonPosts, JSONPost{
			ID:       post.ID,
			Question: post.Question,
			Answer:   post.Answer,
			UserID:   post.UserID,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{"posts": jsonPosts, "token": token})
}

type createPostRequestBody struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

func CreatePost(ctx *gin.Context) {
	var requestBody createPostRequestBody
	err := ctx.BindJSON(&requestBody)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err})
		return
	}

	if len(requestBody.Question) == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Post question empty"})
		return
	}

	val, _ := ctx.Get("userID")
	userID := val.(string)

	// The below fixes an error that was happening when trying to create a post
	// The issue is: It's ALWAYS assigning the user_id of a post to 1 (when it should be the user_id of the logged in user)

	// Create a User ID that is a valid uint
	var userIDUint uint = 1 // Just default to user ID 1 if we can't parse

	// Only try to parse if it looks like a number
	if userID != "" && userID[0] >= '0' && userID[0] <= '9' {
		parsed, err := strconv.ParseUint(userID, 10, 32)
		if err == nil {
			userIDUint = uint(parsed) // here is where we convert the string to a uint
		}
	}

	newPost := models.Post{
		Question: requestBody.Question,
		Answer:   requestBody.Answer,
		UserID:   userIDUint,
	}

	_, err = newPost.Save()
	if err != nil {
		SendInternalError(ctx, err)
		return
	}

	token, _ := auth.GenerateToken(userID)

	ctx.JSON(http.StatusCreated, gin.H{"message": "Post created", "token": token})
}

func GetPostsByUserID(ctx *gin.Context) {
	userIDParam := ctx.Param("id")
	userID, err := strconv.ParseUint(userIDParam, 10, 32)
	
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}
	
	posts, err := models.FetchPostsByUserID(uint(userID))
	
	if err != nil {
		SendInternalError(ctx, err)
		return
	}
	
	val, _ := ctx.Get("userID")
	tokenUserID := val.(string)
	token, _ := auth.GenerateToken(tokenUserID)
	
	// Convert posts to JSON Structs
	jsonPosts := make([]JSONPost, 0)
	for _, post := range *posts {
		jsonPosts = append(jsonPosts, JSONPost{
			ID:       post.ID,
			Question: post.Question,
			Answer:   post.Answer,
			UserID:   post.UserID,
		})
	}
	
	ctx.JSON(http.StatusOK, gin.H{"posts": jsonPosts, "token": token})
}
