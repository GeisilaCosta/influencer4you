package br.org.serratec.influencerforyou.dto;

import java.time.LocalDateTime;

public class CommentDto {

	private Long id;
	private Long postId;
	private String content;
	private String author;
	private LocalDateTime createdAt;

	public CommentDto() {
	}

	public CommentDto(Long id, Long postId, String content, String author, LocalDateTime createdAt) {
		this.id = id;
		this.postId = postId;
		this.content = content;
		this.author = author;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}
