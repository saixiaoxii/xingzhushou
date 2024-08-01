package com.example.fuchuang.DTO;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class AllParamsDTO implements Serializable {

    @ApiModelProperty(value = "用户兴趣")
    private List<String> interest;

}
