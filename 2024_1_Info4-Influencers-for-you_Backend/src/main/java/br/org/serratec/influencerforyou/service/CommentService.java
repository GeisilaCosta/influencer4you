package br.org.serratec.influencerforyou.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.org.serratec.influencerforyou.dto.CommentDto;
import br.org.serratec.influencerforyou.model.Comment;
import br.org.serratec.influencerforyou.model.Post;
import br.org.serratec.influencerforyou.repository.CommentRepository;
import br.org.serratec.influencerforyou.repository.PostRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PostRepository postRepository;

	@Transactional
	public CommentDto addComment(Long postId, String content) {
		Post post = postRepository.findById(postId).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post não encontrado com o ID: " + postId));

		// Obter o autor a partir do contexto de segurança
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String author = authentication.getName();

		Comment comment = new Comment(post, content, author, LocalDateTime.now());
		comment = commentRepository.save(comment);
		return convertToDto(comment);
	}

	public List<CommentDto> getCommentByPostId(Long postId) {
		return commentRepository.findByPostId(postId).stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public CommentDto getCommentbyId(Long id) {
		Comment comment = commentRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comentário não encontrado com o ID: " + id));
		return convertToDto(comment);
	}

	@Transactional
	public CommentDto updateComment(Long id, String content, String currentUsername) {
		Comment comment = commentRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comentário não encontrado com o ID: " + id));

		// Verifica se o usuário atual é o autor do comentário
		if (!currentUsername.equals(comment.getAuthor())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN,
					"Você não tem permissão para atualizar este comentário.");
		}

		comment.setContent(content);
		comment = commentRepository.save(comment);

		return convertToDto(comment);
	}

	@Transactional
	public void deleteComment(Long id) {
		Comment comment = commentRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Comentário não encontrado com o ID: " + id));
		commentRepository.delete(comment);
	}

	private CommentDto convertToDto(Comment comment) {
		return new CommentDto(comment.getId(), comment.getPost().getId(), comment.getContent(), comment.getAuthor(),
				comment.getCreatedAt());
	}

}
