package com.c1se16.resource;

import com.c1se16.core.utils.RandomUtil;
import com.c1se16.resource.constant.ResourceType;
import com.c1se16.resource.response.ResourceResponse;
import com.c1se16.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceConfig resourceConfig;
    private final UserService userService;

    public ResourceResponse saveImageUser(MultipartFile file, String username) throws IOException {
        if (!StringUtils.hasLength(username)) {
            username = this.userService.getNonNullCurrentUser().getUsername();
        }
        String random = RandomUtil.random();
        String url = this.saveFile(file, ResourceType.IMAGE_USER, String.format("%s-%s", username, random));
        return ResourceResponse.builder()
                .url(url)
                .build();
    }

    public ResourceResponse saveProductImage(MultipartFile file, String code) throws IOException {
        String random = RandomUtil.random();
        String url = this.saveFile(file, ResourceType.IMAGE_PRODUCT, String.format("%s-%s", code, random));
        return ResourceResponse.builder()
                .url(url)
                .build();
    }

    public String saveFile(@NonNull MultipartFile file, @NonNull ResourceType resourceType, @NonNull String fileName) throws IOException {
        if (file.isEmpty()) {
            return "";
        }
        File f = new File(this.resourceConfig.getBasePath() + resourceType.getPath());
        if (!f.exists()) {
            f.mkdirs();
        }
        String name = fileName + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
        File imageFile = new File(f, name);
        file.transferTo(imageFile);
        return "\\" + resourceType.getPath() + name;
    }


}
