export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      type: 'boolean',
	  description: 'ADMIN Controls, Toogle if tweet is deemed in appropriate'
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
		name: 'profileImg',
		title: 'Profile Image',
		type: 'string',
	},
	{
		name: 'image',
		title: 'Tweet Image',
		type: 'string',
	},
  ]
}

