package br.org.serratec.influencerforyou.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.org.serratec.influencerforyou.dto.CommentDto;
import br.org.serratec.influencerforyou.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    
    
    @PostMapping
    @Operation(summary = "Adicionar comentário a um post", description = "Permite que um influenciador ou empresa adicione um comentário a um post")
    public ResponseEntity<CommentDto> addComment(
            @RequestParam Long postId,
            @RequestParam String content) {
        CommentDto commentDto = commentService.addComment(postId, content);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }
    
    @GetMapping("/post/{postId}")
    @Operation(summary = "Buscar comentários de um post", description = "Retorna uma lista de todos os comentários de um post específico")
    public ResponseEntity<List<CommentDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentDto> comments = commentService.getCommentByPostId(postId);
        return ResponseEntity.ok(comments);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar comentário por ID", description = "Retorna os detalhes de um comentário específico pelo ID")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable Long id) {
        CommentDto commentDto = commentService.getCommentbyId(id);
        return ResponseEntity.ok(commentDto);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um comentário", description = "Atualiza os detalhes de um comentário específico pelo ID")
    public ResponseEntity<CommentDto> updateComment(
            @PathVariable Long id,
            @RequestParam String content) {
        
        // Obtém o usuário autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String currentUsername = userDetails.getUsername();

        // Atualiza o comentário (apenas se o usuário for o autor)
        CommentDto updatedComment = commentService.updateComment(id, content, currentUsername);
        return ResponseEntity.ok(updatedComment);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um comentário", description = "Remove um comentário específico pelo ID")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
	
}
