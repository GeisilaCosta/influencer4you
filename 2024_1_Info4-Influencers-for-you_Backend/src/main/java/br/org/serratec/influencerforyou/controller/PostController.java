package br.org.serratec.influencerforyou.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.org.serratec.influencerforyou.dto.PostDto;
import br.org.serratec.influencerforyou.service.PostService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/posts")
public class PostController {

	@Autowired
	private PostService postService;

	@GetMapping("/{id}")
	@Operation(summary = "Buscar post por ID", description = "Retorna os detalhes de um post específico pelo ID")
	public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
		PostDto postDto = postService.getPostById(id);
		return ResponseEntity.ok(postDto);
	}

	@GetMapping
	@Operation(summary = "Buscar todos os posts", description = "Retorna uma lista paginada de todos os posts")
	public ResponseEntity<Page<PostDto>> getAllPosts(Pageable pageable) {
		Page<PostDto> posts = postService.getAllPosts(pageable);
		return ResponseEntity.ok(posts);
	}

	@PostMapping
	@Operation(summary = "Criar um novo post", description = "Cria um novo post associado a uma campanha de influenciador")
	public ResponseEntity<PostDto> createPost(@RequestParam Long influencerCampaignId, @RequestParam String content,
			@RequestParam(required = false) MultipartFile file) throws IOException {

		PostDto createdPost = postService.createPost(influencerCampaignId, content, file);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
	}

	@PutMapping("/{id}")
	@Operation(summary = "Atualizar um post", description = "Atualiza os detalhes de um post específico pelo ID")
	public ResponseEntity<PostDto> updatePost(@PathVariable Long id, @RequestParam Long influencerCampaignId,
			@RequestParam String content, @RequestParam(required = false) MultipartFile file) throws IOException {
		PostDto updatedPost = postService.updatePost(id, influencerCampaignId, content, file);
		return ResponseEntity.ok(updatedPost);
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Deletar um post", description = "Remove um post específico pelo ID")
	public ResponseEntity<Void> deletePost(@PathVariable Long id) {
		postService.deletePost(id);
		return ResponseEntity.noContent().build();
	}

}
