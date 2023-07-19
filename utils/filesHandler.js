const loadSave = () => {
  files = saves[saveIndex[0]].files
  
  const filesHTML = `
    <div class="file-container" onClick="loadFile('infos')">
      <div class="file">
        <img src="./assets/svgs/save.svg" class="file-icon">
      </div>
      <div class="file-title">
        infos.psf
      </div>
    </div>
    ${files.sort((a, b) => a._index - b._index).map(file => {
      return `<div class="file-container" onClick="loadFile('${file.name}')">
        <div class="file">
          <img src="./assets/svgs/save.svg" class="file-icon">
        </div>
        <div class="file-title">
          ${file.name}.psf
        </div>
      </div>`
    })}
  `
  
  $('.files-container')[0].innerHTML = filesHTML

  loadFile(selected_file)
}

const loadFile = (file_name) => {
  if (file_name === "infos") {
    opened_files.push("infos")

    selected_file = "infos"
      
    $('.editor')[0].value = infos
    $('.preview')[0].value = infos
      
    update()
      
    return
  }
  for (let file of files) {
    if (file.name === file_name) {
      opened_files.push(file.name)

      selected_file = file
      
      $('.editor')[0].value = file.data
      $('.preview')[0].value = file.data
      
      update()
      
      break
    }
  }
}


const infos = `#^ Syntax;

# Every section startes;
# and ends with a '*';

# Between the two '*';
# you will enter the name;
# of the section;

# exmp;
*example:*

# It is important to add ':';
# after the name, to validate;
# the name;

# Now you can add values;

# There are multiple types;
# of values you can choose from;

# Here is an example section;
# with all value types;

# exmp;
*example:
		# Normal value string;
		# {value_name};
		# output: value_name;
		value;
		
		# Value array;
		# {valu_name1}->{value_name2};
		# output: ['value_name1', 'value_name2'];
		value1->value2;
		
		# Validator;
		# true;
		# output: true;
		true;
		#^ validator types;
		#? true/false/null/undefined/NaN;
		
		# In file reference;
		# ref:{section_name};
		# output: ...value_names;
		# ref:example2;
		#? Value is commented because;
		#? there is no second section;
		
		# File reference;
		# ref:@{file_name}:{value_name};
		# output: ...value_names;
		# ref:@example2:example2;
		#? Value is commented because;
		#? there is no second section;
		
		# Remove values;
		# -{value_name};
		# output: ;
		# Removes value from output;
		-value;
		#! HAS TO BE AT THE END;
		#! OF SECRION, IF USED;
*

# Full section output;
#^ example: [;
#^	  ['value1', 'value2'],;
#^		true;
#^	];

#? The references are in a comment;
#? and we also declared that 'value';
#? should be removed with -value;
#? thats why they are not in the output;`