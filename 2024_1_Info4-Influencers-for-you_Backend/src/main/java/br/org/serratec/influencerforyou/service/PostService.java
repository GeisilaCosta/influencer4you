package br.org.serratec.influencerforyou.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.org.serratec.influencerforyou.dto.ImageDto;
import br.org.serratec.influencerforyou.dto.PostDto;
import br.org.serratec.influencerforyou.model.Image;
import br.org.serratec.influencerforyou.model.InfluencerCampaign;
import br.org.serratec.influencerforyou.model.Post;
import br.org.serratec.influencerforyou.repository.ImageRepository;
import br.org.serratec.influencerforyou.repository.InfluencerCampaignRepository;
import br.org.serratec.influencerforyou.repository.PostRepository;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;

	@Autowired
	private InfluencerCampaignRepository influencerCampaignRepository;

	@Autowired
	private ImageService imageService;

	@Autowired
	private ImageRepository imageRepository;

	@Transactional(readOnly = true)
	public PostDto getPostById(Long id) {
		Post post = postRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post não encontrado com o ID: " + id));
		return convertToDto(post);
	}

	@Transactional(readOnly = true)
	public Page<PostDto> getAllPosts(Pageable pageable) {
		Page<Post> posts = postRepository.findAll(pageable);
		return posts.map(this::convertToDto);
	}

	@Transactional
	public PostDto createPost(Long influencerCampaignId, String content, MultipartFile file) throws IOException {
		InfluencerCampaign influencerCampaign = influencerCampaignRepository.findById(influencerCampaignId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Vínculo influenciador-campanha não encontrado"));

		ImageDto imageDto = null;
		if (file != null && !file.isEmpty()) {
			imageDto = imageService.insert(file);
		}

		Post post = new Post();
		post.setInfluencerCampaign(influencerCampaign);
		post.setContent(content);

		if (imageDto != null) {
			Optional<Image> image = imageRepository.findById(imageDto.getId());
			image.ifPresent(post::setImage);
		}

		post = postRepository.save(post);
		return convertToDto(post);
	}

	@Transactional
	public PostDto updatePost(Long id, Long influencerCampaignId, String content, MultipartFile file)
			throws IOException {
		Post post = postRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post não encontrado com o ID: " + id));

		InfluencerCampaign influencerCampaign = influencerCampaignRepository.findById(influencerCampaignId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Vínculo influenciador-campanha não encontrado"));

		post.setInfluencerCampaign(influencerCampaign);
		post.setContent(content);

		if (file != null && !file.isEmpty()) {
			ImageDto imageDto = imageService.insert(file);
			Optional<Image> image = imageRepository.findById(imageDto.getId());
			image.ifPresent(post::setImage);
		}

		post = postRepository.save(post);
		return convertToDto(post);
	}

	@Transactional
	public void deletePost(Long id) {
		Post post = postRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post não encontrado com o ID: " + id));
		postRepository.delete(post);
	}

	private PostDto convertToDto(Post post) {
		PostDto dto = new PostDto();
		dto.setId(post.getId());
		dto.setInfluencerCampaignId(post.getInfluencerCampaign().getId());
		dto.setContent(post.getContent());

		Optional<ImageDto> imageDto = imageService.findById(post.getImage().getId());
		if (imageDto.isPresent()) {
			dto.setImageId(imageDto.get().getId());
			dto.setImageUrl(imageDto.get().getUrl());
		}
		return dto;
	}

}
